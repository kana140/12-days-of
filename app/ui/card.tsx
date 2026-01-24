export default function Card() {
  return (
    // <div className="h-20 w-3/4 bg-primary m-2 shadow-sm rounded-sm">
    //   {/* Card Header */}
    //   <div
    //     className={`${lusitana.className}  text-gray-800 p-2 w-full shadow-sm border border-text-gray-800 flex justify-between`}
    //   >
    //     <p className="text-xl">Day 1</p>
    //     <p className="text-lg">Gift Name</p>
    //   </div>
    // </div>

    <div>
      <details
        className="collapse bg-base-100 border border-base-300"
        name="my-accordion-det-1"
        open
      >
        <summary className="collapse-title font-semibold">
          How do I create an account?
        </summary>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </details>
      <details
        className="collapse bg-base-100 border border-base-300"
        name="my-accordion-det-1"
      >
        <summary className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </summary>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </details>
      <details
        className="collapse bg-base-100 border border-base-300"
        name="my-accordion-det-1"
      >
        <summary className="collapse-title font-semibold">
          How do I update my profile information?
        </summary>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </details>
    </div>
  );
}
