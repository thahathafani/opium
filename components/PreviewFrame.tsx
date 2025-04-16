"use client";

type Props = {
  html: string;
};

export default function PreviewFrame({ html }: Props) {
  return (
    <iframe
      className="w-full h-full border-0 bg-white rounded"
      srcDoc={html}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
