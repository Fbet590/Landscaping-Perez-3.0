import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = {
      package: body.package,
      name: body.name,
      email: body.email,
      phone: body.phone,
      submitted_at: new Date().toISOString(),
      source: "Landscaping Perez Landing Page",
    }

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/5xmJQ9GnZ2epwQjXcomF/webhook-trigger/Yj8DbktvyCWEVeWzMAaP"

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Webhook responded with status:", response.status)
      return NextResponse.json(
        { error: "Failed to submit" },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting to webhook:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
