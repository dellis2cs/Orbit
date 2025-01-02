export default function FeatureCard({ title, description }) {
  return (
    <div className="text-left">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
