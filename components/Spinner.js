const Spinner = ({ size = 24, color = "white" }) => {
    return (
        <svg
            className="animate-spin"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
        >
            {/* Background circle */}
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="4"
            />
            {/* Top semicircle stroke */}
            <path
                className="opacity-75"
                d="M2 12 A10 10 0 0 1 22 12"
                stroke={color}
                strokeWidth="4"
                fill="none"
            />
        </svg>
    );
};

export default Spinner;