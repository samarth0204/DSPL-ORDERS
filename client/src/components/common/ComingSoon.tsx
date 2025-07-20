const ComingSoon = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center text-gray h-full w-full">
      {message} - Arriving soon..
    </div>
  );
};

export default ComingSoon;
