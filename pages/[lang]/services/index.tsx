import CustomBento from '@/components/ui/custombento';
import Hero from '@/features/services/Hero';
import Expertise from '@/features/shared/expertise/Expertise';
import Timeline from '@/features/shared/timeline/Timeline';
import { fetchProjects } from '@/services/projects.service';

export default function Services() {
  return (
    <>
      <Hero />
      <Expertise isPageServices={true} />
      <Timeline />
      <CustomBento />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: 'en' } }, { params: { lang: 'fr' } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  const projects = await fetchProjects();

  return {
    props: {
      projects,
    },
  };
}
