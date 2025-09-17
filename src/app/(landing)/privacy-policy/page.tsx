import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Privacy policy",
  description: "Privacy policy and GDPR clause",
}

export default function PrivacyPolicy(): JSX.Element {
  return <div>Privacy policy and GDPR</div>
}
        