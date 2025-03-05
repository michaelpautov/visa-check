export default async function VisaApplicationPassportFromPage({
  params,
}: {
  params: { passportFrom: string };
}) {
  const { passportFrom } = await params;
  return (
    <div>
      <h1>{passportFrom}</h1>
    </div>
  )
}