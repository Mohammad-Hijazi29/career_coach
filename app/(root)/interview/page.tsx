import Agent  from "@/components/Agent"
import {getCurrentUser} from "@/lib/actions/auth.action"

const  Page = async () => {

    const user = await getCurrentUser();
    return (
        <>
        <h3>Interview Agent</h3>
 
        <Agent userName={user?.name || ''} userId={user?.id} type="generate" />
        </>
    )
}



export default Page