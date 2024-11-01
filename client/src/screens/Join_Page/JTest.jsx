import React from 'react'
import { useToast } from "../../hooks/use-toast"
import { Button } from "../../components/ui/button"

const JTest = () => {

    const { toast } = useToast()

    const handleToast = () => {
        toast({description: "Success"})
    }

  return (
    <>
        <div>
            <Button
            variant="outline"
            onClick={handleToast}
            >
            Show Toast
            </Button>
        </div>
    </>
  )
}

export default JTest