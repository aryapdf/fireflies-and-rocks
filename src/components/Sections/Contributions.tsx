import {toVw} from "@/utils/toVw";
import ContributionCards from "@/components/Card/ContributionCards";
import {useTheme} from "@/hooks/useTheme";

export default function Contributions() {
    const { isDark } = useTheme()

    return (
        <section
            id="contribution-section"
            style={{
                padding: `0 ${toVw(150)}`,
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                opacity: 0,
                transform: 'translateY(50px)',
            }}
        >
            <ContributionCards isDark={isDark}/>
        </section>
    )
}