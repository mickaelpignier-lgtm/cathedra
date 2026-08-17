import { StadiumForm } from "@/components/admin/StadiumForm";

export default function NewStadiumPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Nouveau stade</h1>
      <StadiumForm mode="create" />
    </div>
  );
}
