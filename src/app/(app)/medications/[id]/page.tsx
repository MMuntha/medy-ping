import MedicationDetailContent from "./MedicationDetailContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return {
    title: "Medication Details — MedyPing",
  };
}

export default async function MedicationViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MedicationDetailContent id={id} />;
}
