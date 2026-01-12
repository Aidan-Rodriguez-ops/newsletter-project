import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import sgMail from '@sendgrid/mail'

// Use service role to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from('subscribers')
      .select('id, subscribed')
      .eq('email', email)
      .single()

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 409 }
        )
      } else {
        // Resubscribe
        const { error: updateError } = await supabaseAdmin
          .from('subscribers')
          .update({
            subscribed: true,
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null
          })
          .eq('email', email)

        if (updateError) {
          throw updateError
        }

        // Send welcome back email
        if (process.env.SENDGRID_API_KEY) {
          try {
            const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'mainlinebriefingroom@gmail.com'

            await sgMail.send({
              from: fromEmail,
              to: email,
              subject: 'Welcome back to Main Line Briefing Room!',
              html: `
                <h1>Welcome back!</h1>
                <p>You've successfully resubscribed to the Main Line Briefing Room newsletter.</p>
                <p>You'll receive updates about new articles and market insights.</p>
                <br />
                <p style="font-size: 12px; color: #666;">
                  Don't want to receive these emails?
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>
                </p>
              `
            })
            console.log('Welcome back email sent successfully to:', email)
          } catch (emailError: any) {
            console.error('Failed to send welcome back email:', emailError)
            console.error('Email error details:', emailError.message)
          }
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been resubscribed to our newsletter.'
        })
      }
    }

    // Insert new subscriber
    const { error: insertError } = await supabaseAdmin
      .from('subscribers')
      .insert([{ email }])

    if (insertError) {
      throw insertError
    }

    // Send welcome email
    if (process.env.SENDGRID_API_KEY) {
      try {
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'mainlinebriefingroom@gmail.com'

        await sgMail.send({
          from: fromEmail,
          to: email,
          subject: 'Welcome to Main Line Briefing Room!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Welcome to Main Line Briefing Room!</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #666;">
                Thank you for subscribing to our newsletter. You'll receive:
              </p>
              <ul style="font-size: 14px; line-height: 1.8; color: #666;">
                <li>New article notifications</li>
                <li>Market updates and insights</li>
                <li>Contrarian perspectives on current events</li>
              </ul>
              <p style="font-size: 14px; color: #666;">
                We're excited to have you as part of our community!
              </p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
              <p style="font-size: 12px; color: #999;">
                Don't want to receive these emails?
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666;">Unsubscribe</a>
              </p>
            </div>
          `
        })
        console.log('Welcome email sent successfully to:', email)
      } catch (emailError: any) {
        console.error('Failed to send welcome email:', emailError)
        console.error('Email error details:', emailError.message)
        // Don't fail the subscription if email fails
      }
    } else {
      console.log('SendGrid not configured - subscription saved without email')
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
