export default function DeleteData() {
  return (
    <main className="h-[80vh] w-screen flex flex-col justify-center items-center gap-4 text-black">
      <h1 className="text-2xl font-bold mb-4">User Data Deletion</h1>
      <p>
        You can delete your account and all associated data from the dashboard at any time.
      </p>
      <p>
        To do this, log in to your account, go to your Dashboard, and click the <strong>&ldquo;Delete My Account&rdquo;</strong> button.
      </p>
      <p>
        If you&apos;re unable to log in or want to request manual deletion, please email us at <a className="underline" href="mailto:aashishv2323@gmail.com">aashishv2323@gmail.com</a>.
      </p>
    </main>
  );
}