// import { useEditorRef } from "platejs/react";

// import { HouseIcon } from "@phosphor-icons/react";
// import { ToolbarButton } from "../../toolbar";
// import baseUrl from "@/lib/base-url";

// import { redirect } from 'next/navigation';

// export function GoHomeButton() {
//   const editor = useEditorRef()
  
//   return (
//     <ToolbarButton
//       onClick = { async() => {
//         // Custom action to toggle the plane 
//         try {
//           const changes = editor.api.markdown.serialize();
//           const response = await fetch(`${baseUrl}/api/documents/${id}`, {
//             method: "PATCH",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ update: changes }),
//           });
    
//           if (!response.ok) {
//             throw new Error(`Save failed with status: ${response.status}`);
//           }
    
//           await mutate(`${baseUrl}/api/documents/${id}`);
//           await new Promise((resolve) => setTimeout(resolve, 800));
//           redirect("/dashboard");
//         } catch (error) {
//           console.error("Failed to save:", error);
//           setIsSaving(false);
//         }
//         redirect("/dashboard");
//       }}
//       tooltip="Go Back"
//     >
//       <HouseIcon size={26} weight="thin"/>
//     </ToolbarButton >
//   )
// }