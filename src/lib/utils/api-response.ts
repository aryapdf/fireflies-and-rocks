import { NextResponse } from "next/server";

export function successResponse(data: any, status = 200) {
    return NextResponse.json({ success: true, data }, {status})
}

export function errorResponse(message:any, status = 500) {
    return NextResponse.json(
        { success: false, error: message },
        { status }
    )
}

export function validationErrorResponse(errors: any) {
    return NextResponse.json(
        {success: false, error: "Validation failed", details: errors},
        { status: 400 }
    )
}