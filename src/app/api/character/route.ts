import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prismaClient";

export async function POST(request : NextRequest, response : NextResponse) {

    try {

        const body = await request.json()

        const duplicate = await prisma.character.findMany({
            where : {
                codeName : body.codeName,
            }
        })

        if (duplicate.length > 1) {
            console.log(1)
            return NextResponse.json({error : "duplicate"}, {
                status : 409
            })
        }

        const character = await prisma.character.create({
            data : {
                name : body.name,
                codeName : body.codeName,
                id : body.id
            }
        })
    
        return NextResponse.json({character}, {
            status : 200
        })

    }

    catch (error) {
        return NextResponse.json({error}, {
            status : 400
        })
    }

}

export async function DELETE(request : NextRequest, response : NextResponse) {

    try {

        const body = await request.json()

        const deleteCharacter = await prisma.character.delete({
            where : {
                codeName : body.codeName,
            }
        })
    
        return NextResponse.json({deleteCharacter}, {
            status : 200
        })

    }

    catch (error) {
        return NextResponse.json({error}, {
            status : 400
        })
    }

}

export async function PATCH(request : NextRequest, response : NextResponse) {

    try {

        const body = await request.json()

        const character = await prisma.character.update({
            where : {
                codeName : body.codeName
            },
            data : {
                gamesWon : {increment : body.win},
                gamesLost : {increment : body.loss}
            }
        })
    
        return NextResponse.json({character}, {
            status : 200
        })

    }

    catch (error) {
        return NextResponse.json({error}, {
            status : 400
        })
    }

}

export async function GET(request : NextRequest, response : NextResponse) {

    try {

        const codeName = request.nextUrl.searchParams.get("codeName")

        const character = await prisma.character.findUnique({
            where : {
                codeName : codeName
            }
        })
    
        return NextResponse.json({character}, {
            status : 200
        })

    }

    catch (error) {
        return NextResponse.json({error}, {
            status : 400
        })
    }

}