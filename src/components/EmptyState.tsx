// src/components/EmptyState.tsx
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="text-center text-gray-500 py-10">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
