import { Body, Head, Html, Preview, Tailwind } from "@react-email/components"

interface EnquiryNotificationForCustomerEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export function EnquiryNotificationForCustomerEmail({
  firstName,
  lastName,
}: EnquiryNotificationForCustomerEmailProps): JSX.Element {
  const previewText = `${firstName} ${lastName} has sent an enquiry from the contact form>`

  return (
    <Html lang="en">
      <Head>
        <title>Enquiry from contact form</title>
        <Preview>{previewText}</Preview>
      </Head>
      <Tailwind>
        <Body>
          {/* TODO */}
          New enquiry from contact form sent to New Vision hospital
        </Body>
      </Tailwind>
    </Html>
  )
}
   