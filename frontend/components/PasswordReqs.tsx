
export default function PasswordRequirements({ 
    errors 
  }: { 
    errors: string[] 
  }) {
    return (
      <div className="mt-2">
        {errors.map((error, index) => (
          <p 
            key={index} 
            className="text-xs text-red-500"
          >
            • {error}
          </p>
        ))}
      </div>
    )
  }