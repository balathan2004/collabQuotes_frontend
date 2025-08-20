// import { ResponseConfig } from "../interfaces";
// interface Props {
//   data: object;
//   route: string;
// }

// export default async function SendData({
//   route,
//   data,
// }: Props): Promise<ResponseConfig | undefined> {
//   try {
//     const reqConfig: RequestInit = {
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method:"POST",
//       credentials:"include"
//     };
//     const response = (await (
//       await fetch(route, reqConfig)
//     ).json()) as ResponseConfig;

//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }
