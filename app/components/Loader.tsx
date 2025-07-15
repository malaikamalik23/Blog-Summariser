const Loader = () => {
  return (
    <div className="mt-6 flex flex-col items-center text-purple-600 animate-pulse">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2 text-sm font-medium">Summarising your blog... ⏳</p>
    </div>
  );
};

export default Loader;
