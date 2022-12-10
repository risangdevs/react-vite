export default function Source({ source }) {
  const { annotations } = source[0];
  return (
    <>
      <section className="flex flex-col px-4 py-4 justify-center items-center mt-10 space-y-8">
        <h1>US Population Census</h1>
        <table className="mt-4 w-fit">
          <thead className="bg-slate-400 border-2 border-zinc-600">
            <tr className="px-4 space-x-4 flex justify-start items-center">
              <td className="font-semibold text-lg w-40">Dataset</td>
              <td className="font-semibold text-lg w-20">Source</td>
              <td className="font-semibold text-lg w-[300px]">Description</td>
              <td className="font-semibold text-lg w-20">Topic</td>
              <td className="font-semibold text-lg w-24">Subtopic</td>
              <td className="font-semibold text-lg w-20">TableID</td>
            </tr>
          </thead>
          <tbody className="bg-slate-200">
            <tr className="px-4 space-x-4 flex justify-start items-center">
              <td className="font-light text-base w-40">
                <a
                  className="text-cyan-700 underline"
                  href={annotations.dataset_link}
                >
                  {annotations.dataset_name}
                </a>
              </td>
              <td className="font-light text-base w-20">
                {annotations.source_name}
              </td>
              <td className="font-light text-base w-[300px]">
                {annotations.source_description}
              </td>
              <td className="font-light text-base w-20">{annotations.topic}</td>
              <td className="font-light text-base w-24">
                {annotations.subtopic}
              </td>
              <td className="font-light text-base w-20">
                {annotations.table_id}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
