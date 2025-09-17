import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `Email verification for ${siteConfig.nameShort}`
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hi,</Text>
              <Text className="text-base">
                Someone has just attempted to use the address {email} to create an
                administrator account on{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.nameShort}
                </span>
                .
              </Text>
              <Text className="text-base">
                If this was you, click the link below to verify your email address
                and complete the account creation process.
              </Text>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
              >
                Verify email address
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                If you did not attempt to register, ignore this email.
              </Text>
              <Text className="text-base font-medium">Have a nice day!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
    