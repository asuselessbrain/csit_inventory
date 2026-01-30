import React from "react";

export default async function TaskToReviewDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>TaskToReviewDetailsPage: {slug}</div>;
}
