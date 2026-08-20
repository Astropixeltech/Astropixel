import Layout from "@/components/Layout";
import JoinTeamPage from "@/views/JoinTeamPage";

export const metadata = {
  title: "Join Our Team | AstroPixel Creative Agency",
  description: "Apply to join the AstroPixel creative team as a designer, developer, or digital marketer.",
};

export default function JoinTeam() {
  return (
    <Layout>
      <JoinTeamPage />
    </Layout>
  );
}

