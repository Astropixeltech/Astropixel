import Layout from "@/components/Layout";
import JoinTeamPage from "@/views/JoinTeamPage";

export const metadata = {
  title: "Join Our Team | AstroPixel Creative Agency",
  description: "Apply to join the AstroPixel creative team as a designer, developer, or digital marketer in Rajshahi, Bangladesh.",
  alternates: {
    canonical: "https://astropixel.tech/join-team",
  },
  openGraph: {
    title: "Join Our Team | AstroPixel Creative Agency",
    description: "Apply to join the AstroPixel creative team as a designer, developer, or digital marketer in Rajshahi, Bangladesh.",
    url: "https://astropixel.tech/join-team",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "Join AstroPixel Team" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Our Team | AstroPixel Creative Agency",
    description: "Apply to join the AstroPixel creative team as a designer, developer, or digital marketer in Rajshahi, Bangladesh.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function JoinTeam() {
  return (
    <Layout>
      <JoinTeamPage />
    </Layout>
  );
}
