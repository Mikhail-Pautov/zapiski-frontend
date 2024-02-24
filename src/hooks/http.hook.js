

export const useHttp = () => {
    
    var bearer = 'Bearer ' + window.localStorage.getItem('token');
    const request = async (url, method = 'GET', body = null, headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,


    }) => {

        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

           
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                
            }

            
            const data = await response.json()
            return data;
        } catch(e) {
            
            throw e;
        }
    }; 

    
    return {request}
    
}