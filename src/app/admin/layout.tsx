import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import "../globals.css";

async function AdminGate({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!email || email !== process.env.ADMIN_EMAIL) {
    redirect("/fr");
  }

  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#0b0b0c] font-sans text-[#f2efe9]">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#2E5BFF",
              colorBackground: "#0b0b0c",
              colorForeground: "#f2efe9",
              colorInput: "#141517",
              colorInputForeground: "#f2efe9",
              borderRadius: "4px",
            },
          }}
        >
          <div className="mx-auto min-h-full max-w-6xl px-6 py-8">
            <AdminGate>{children}</AdminGate>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
