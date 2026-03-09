"use client";

export default function AboutPage() {
  return (
    <div className="flex-1 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8"
            style={{ fontFamily: 'var(--font-nexa-regular)' }}
          >
            About Orunos
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Dear Reader,
            </p>

            <p className="leading-relaxed">
              Welcome to Orunos — your academic copilot designed specifically for graduate researchers, PhD candidates, and scholars who demand precision in their work.
            </p>

            <p className="leading-relaxed">
              We built Orunos because we understand the unique challenges that come with academic writing. Generating citations across thousands of sources, synthesizing complex literature, and producing scholarly documents with rigorous accuracy — these tasks should empower your research, not burden it.
            </p>

            <p className="leading-relaxed">
              Our mission is simple: to accelerate your academic journey without replacing the learning process. We believe technology should enhance your scholarly pursuits, giving you more time to focus on what truly matters — your research and ideas.
            </p>

            <p className="leading-relaxed">
              Whether you&apos;re drafting your first research paper or completing a dissertation, Orunos is here to help you write with confidence and precision.
            </p>

            <p className="leading-relaxed">
              Thank you for being part of our community.
            </p>

            <p className="text-lg">
              Warm regards,<br />
              The Orunos Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
