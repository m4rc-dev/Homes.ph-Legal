import LawyerProfilePanel from '@/components/dashboard/panels/LawyerProfilePanel'

interface Props {
  params: { id: string }
}

export default function LawyerProfilePage({ params }: Props) {
  return <LawyerProfilePanel lawyerId={params.id} />
}
