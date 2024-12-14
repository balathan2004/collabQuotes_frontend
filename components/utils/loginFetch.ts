import { AuthResponseConfig } from "../interfaces";
interface Props {
  data: object;
  route: string;
}

export default async function LoginFetch({
  route,
  data,
}: Props): Promise<AuthResponseConfig | undefined> {
  try {
    const reqConfig: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = (await (
      await fetch(route, reqConfig)
    ).json()) as AuthResponseConfig;

    return response;
  } catch (err) {
    console.log(err);
  }
}
