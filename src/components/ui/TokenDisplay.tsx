type TokenDisplayProps = {
  token: string;
  maxLength?: number;
};

export default function TokenDisplay({
  token,
  maxLength = 50,
}: TokenDisplayProps) {
  const displayedToken =
    token.length > maxLength ? `${token.substring(0, maxLength)}...` : token;

  return (
    <div className="mt-4 p-2 bg-gray-100 border rounded-md relative">
      {" "}
      <p className="text-xs text-gray-500">
        Token: {displayedToken}
        {token.length > maxLength && (
          <span className="group inline-block">
            {" "}
            <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2  w-max  bg-gray-700 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
              {token}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}
