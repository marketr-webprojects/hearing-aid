import type { Metadata } from "next";

import { SubPage, ImageCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Comprehensive Hearing Evaluation (Adult & Pediatric) | Linaw Dinig",
  description:
    "Accurate adult and pediatric hearing tests in Tanay, Cebu, Dasmariñas and La Union — pure tone & speech audiometry, tympanometry, newborn hearing screening, play audiometry, ABR/BAER and ASSR, plus occupational, seafarer and pilot hearing screening from qualified audiologists.",
  keywords: [
    "hearing test Philippines",
    "pure tone audiometry",
    "tympanometry",
    "newborn hearing screening",
    "ABR BAER test",
    "ASSR test",
    "pediatric hearing test",
    "seafarer hearing test",
    "audiometry Tanay Cebu Dasmariñas La Union",
  ],
  openGraph: {
    title: "Comprehensive Hearing Evaluation (Adult & Pediatric)",
    description: "Accurate adult and pediatric hearing assessments using the latest audiometric tools.",
  },
};

export default function Page() {
  return (
    <SubPage
      eyebrow="Services"
      title="Comprehensive Hearing Evaluation"
      subtitle="We provide accurate hearing assessments for adults and children using the latest audiometric tools."
    >
      <p>
        A proper diagnosis is the foundation of good hearing care. Whether you&rsquo;re an adult noticing changes in
        your hearing or a parent concerned about your child, our qualified audiologists choose the right combination of
        tests for the age and needs of each patient — then explain the results in plain, jargon-free language.
      </p>
      <p>
        Every evaluation is carried out in a sound-treated environment with calibrated equipment, so you receive an
        accurate picture of your hearing and clear, honest recommendations on the next steps. Hearing evaluations are
        available across all four Linaw Dinig branches in Tanay, Rizal, Cebu City, Cebu, Dasmariñas City, Cavite, and
        Rosario, La Union.
      </p>

      <h2 className="text-2xl md:text-3xl">Adult Hearing Tests</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <ImageCard title="Pure Tone Audiometry & Speech Audiometry" img="/assets/pure-tone-audiometry.webp" alt="Patient wearing audiometric headphones in a sound-treated booth during a pure tone hearing test">
          Measures the softest sounds you can hear across a range of pitches to map the degree and type of your hearing
          loss, and assesses how clearly you understand speech at different volumes — a key measure for planning the
          right hearing aid fitting.
        </ImageCard>
        <ImageCard title="Tympanometry" img="/assets/tympanometry.webp" alt="Audiologist performing a tympanometry middle-ear test on a patient">
          It is a quick, non-invasive test that evaluates how well the eardrum and middle ear are functioning. This test
          checks the movement of the eardrum and helps identify middle ear conditions such as ear infections.
        </ImageCard>
      </div>

      <h2 className="text-2xl md:text-3xl">Pediatric Hearing Tests</h2>
      <div className="grid gap-5 md:grid-cols-3">
        <ImageCard title="Newborn Hearing Screening" img="/assets/newborn-hearing-screening.webp" alt="Newborn baby undergoing a gentle hearing screening">
          A safe, quick, and painless hearing test that may be performed shortly after birth to check a baby&rsquo;s
          hearing. Early detection of hearing loss allows timely intervention and support, which are essential for
          normal speech, language, and cognitive development.
        </ImageCard>
        <ImageCard title="Play Audiometry" img="/assets/play-audiometry.webp" alt="Young child taking a play-based hearing test with an audiologist">
          A hearing test designed for young children, typically ages 2 to 5 years, that uses games or playful activities
          to measure hearing ability. This fun and engaging approach helps audiologists accurately assess a child&rsquo;s
          hearing levels in a comfortable and child-friendly manner.
        </ImageCard>
        <ImageCard title="ABR / BAER & ASSR" img="/assets/abr-baer-assr.webp" alt="Infant undergoing an ABR/BAER and ASSR objective hearing test with electrodes">
          These are objective hearing tests that measure how the hearing nerve and brain respond to sound which are
          commonly used for newborns, younger children, and individuals who cannot participate in conventional hearing
          tests. ABR / BAER helps assess the integrity of the hearing pathway, while ASSR provides frequency-specific
          information that can estimate the degree of hearing loss and assist in hearing aid fitting.
        </ImageCard>
      </div>

      <p className="font-semibold text-primary">
        Early detection matters — championing early intervention gives every child the best chance at fuller connection
        and communication.
      </p>

      <h2 className="text-2xl md:text-3xl">Occupational &amp; Specialized Hearing Screening</h2>
      <p>
        Many workplaces and licensing bodies require documented hearing screening. Our audiologists provide certified
        assessments for employees, seafarers and aviation personnel, with clear reports suitable for pre-employment and
        annual medical requirements.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <ImageCard title="Industrial &amp; Occupational Hearing Screening" img="/assets/industrial-hearing-screening.webp" alt="Industrial worker in a high-noise environment wearing hearing protection">
          Baseline and annual hearing tests for workers exposed to noise — supporting workplace safety and occupational
          health compliance with accurate, well-documented audiograms.
        </ImageCard>
        <ImageCard title="Maritime &amp; Aviation Hearing Tests" img="/assets/maritime-aviation.webp" alt="Seafarer and pilot representing maritime and aviation medical hearing assessments" ratio="aspect-[4/3]">
          Hearing assessments for seafarers (PEME) and aviation personnel, helping you meet maritime and aviation medical
          certification requirements.
        </ImageCard>
      </div>
    </SubPage>
  );
}
