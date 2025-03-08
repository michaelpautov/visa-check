'use client'
import { getFlagSquare } from "@/lib/get-flag";

export const SquareFlag = ({ code }: { code: string }) => getFlagSquare(code, 'w-3 h-3 rounded-full');