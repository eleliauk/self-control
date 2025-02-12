const preUrl = "http://nktnqz.natappfree.cc"
export async function post<T, U>(url = '', data: U): Promise<T> {
    const headers = new Headers();  
    const response = await fetch(`${preUrl}${url}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('401');
      } else if (response.status === 400) {
        const errorData = (await response.json()) as { code: number; msg: string };
        throw new Error(`${errorData.code}: ${errorData.msg}`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  
    return response.json();
  }