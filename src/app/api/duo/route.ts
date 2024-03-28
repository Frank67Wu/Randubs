import { PrismaClient } from "@prisma/client";
import { prisma } from "../prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest, response : NextResponse) {

    try {

        const body = await request.json()

        const existingDuo = await prisma.duo.findMany({
            where :  {
                characterOneCodeName : body.characterOne,
                characterTwoCodeName : body.characterTwo
            },
        }) 

        if (existingDuo.length > 0) {
            return NextResponse.json({"error" : "existing Duo"}, {
                status : 409
            })
        }

        const duo = await prisma.duo.create({
            data : {
                characterOne : {
                    connect : {codeName : body.characterOne}
                },
                characterTwo : {
                    connect : {codeName : body.characterTwo}
                }
            }           
        })
    
        return NextResponse.json({duo}, {
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

        const deleteDuo = await prisma.duo.deleteMany({
            where :  {
                characterOneCodeName : body.characterOne,
                characterTwoCodeName : body.characterTwo
            }
        })
    
        return NextResponse.json({deleteDuo}, {
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

        const findDuo = await prisma.duo.findMany({
            where :  {
                characterOneCodeName : body.characterOne,
                characterTwoCodeName : body.characterTwo
            },
        })

        if (findDuo.length === 0) {
            const newDuo = await prisma.duo.create({
                data : {
                    characterOne : {
                        connect : {codeName : body.characterOne}
                    },
                    characterTwo : {
                        connect : {codeName : body.characterTwo}
                    }, 
                    gamesWon : body.win,
                    gamesLost : body.loss
                }           
            })

            return NextResponse.json({newDuo}, {
                status : 200
            })
        }

        else {
            const duo = await prisma.duo.updateMany({
                where :  {
                    characterOneCodeName : body.characterOne,
                    characterTwoCodeName : body.characterTwo
                },
                data : {
                    gamesWon : {increment : body.win},
                    gamesLost : {increment : body.loss}
                }
            })

            return NextResponse.json({duo}, {
                status : 200
            })
        }
    

    }

    catch (error) {
        return NextResponse.json({error}, {
            status : 400
        })
    }

}

export async function GET(request : NextRequest, response : NextResponse) {

    try {

        const body = await request.json()

        const duo = await prisma.duo.findMany({
            where :  {
                characterOneCodeName : body.characterOne,
                characterTwoCodeName : body.characterTwo
            },
        })
    
        return NextResponse.json({duo}, {
            status : 200
        })

    }

    catch (error) {
        return NextResponse.json({error}, {
            status : 400
        })
    }

}