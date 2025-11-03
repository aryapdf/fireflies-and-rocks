'use client';

import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string | React.ReactNode;
    cursorBlinkDuration?: number;
    cursorClassName?: string;
    text: string | string[];
    as?: ElementType;
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    textColors?: string[];
    variableSpeed?: { min: number; max: number };
    onSentenceComplete?: (sentence: string, index: number) => void;
    startOnVisible?: boolean;
    reverseMode?: boolean;
    externalCharCount?: number | null;
    onFullTextReady?: (text: string, length: number) => void;
    currentIndex?: number | null;
    setCurrentIndex?: (index: number) => void;
    freezeAnimation?: boolean; // 👈 NEW PROP
}

const TextType = ({
                      text,
                      as: Component = 'div',
                      typingSpeed = 50,
                      initialDelay = 0,
                      pauseDuration = 2000,
                      deletingSpeed = 30,
                      loop = true,
                      className = '',
                      showCursor = true,
                      hideCursorWhileTyping = false,
                      cursorCharacter = '|',
                      cursorClassName = '',
                      cursorBlinkDuration = 0.5,
                      textColors = [],
                      variableSpeed,
                      onSentenceComplete,
                      startOnVisible = false,
                      reverseMode = false,
                      externalCharCount = null,
                      onFullTextReady,
                      currentIndex = null,
                      setCurrentIndex,
                      freezeAnimation = false, // 👈 default false
                      ...props
                  }: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const [frozenFullText, setFrozenFullText] = useState('');

    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return;
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (freezeAnimation && timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            if (setCurrentIndex) {
                setCurrentIndex(currentTextIndex)
            }
        }
    }, [freezeAnimation, currentTextIndex, setCurrentIndex]);

    // Handle external GSAP control
    useEffect(() => {
        if (externalCharCount !== null && frozenFullText) {
            const clampedCount = Math.max(0, Math.min(frozenFullText.length, Math.floor(externalCharCount)));
            setDisplayedText(frozenFullText.slice(0, clampedCount));
        }
    }, [externalCharCount, frozenFullText]);

    // Reset if text prop changes
    useEffect(() => {
        setDisplayedText('');
        setCurrentCharIndex(0);
        setIsDeleting(false);
        setCurrentTextIndex(0);
    }, [text]);

    // Intersection Observer
    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;

        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && setIsVisible(true)),
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    // Cursor blink
    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    // Main typing animation
    useEffect(() => {
        if (!isVisible || freezeAnimation || externalCharCount !== null) return;

        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

        const step = () => {
            if (freezeAnimation) return; // immediately stop animation if freeze triggered
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) return;

                    onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex);
                    const nextIndex = (currentTextIndex + 1) % textArray.length;
                    setCurrentTextIndex(nextIndex);
                    setCurrentIndex?.(nextIndex);
                    setCurrentCharIndex(0);
                } else {
                    timeoutRef.current = setTimeout(() => {
                        setDisplayedText(prev => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeoutRef.current = setTimeout(() => {
                        setDisplayedText(prev => prev + processedText[currentCharIndex]);
                        setCurrentCharIndex(prev => prev + 1);
                    }, variableSpeed ? getRandomSpeed() : typingSpeed);
                } else {
                    // completed typing
                    setFrozenFullText(processedText);
                    onFullTextReady?.(processedText, processedText.length);
                    if (loop && textArray.length > 1 && externalCharCount === null) {
                        timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
                    }
                }
            }
        };

        if (!freezeAnimation) step();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [
        isVisible,
        displayedText,
        currentCharIndex,
        isDeleting,
        currentTextIndex,
        textArray,
        typingSpeed,
        deletingSpeed,
        variableSpeed,
        loop,
        reverseMode,
        externalCharCount,
        pauseDuration,
        freezeAnimation,
        onFullTextReady,
        onSentenceComplete,
        getRandomSpeed
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex]?.length || isDeleting);

    return createElement(
        Component,
        { ref: containerRef, className: `inline-block whitespace-pre-wrap tracking-tight ${className}`, ...props },
        <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
      {displayedText}
    </span>,
        showCursor && (
            <span
                ref={cursorRef}
                className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
            >
        {cursorCharacter}
      </span>
        )
    );
};

export default TextType;
