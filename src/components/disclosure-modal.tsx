"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DisclosureModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Check if user has already acknowledged the disclosure
    const hasAcknowledged = localStorage.getItem("disclosure-acknowledged")

    if (!hasAcknowledged) {
      setOpen(true)
    }
  }, [])

  const handleAcknowledge = () => {
    // Save acknowledgment to localStorage
    localStorage.setItem("disclosure-acknowledged", "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Important Disclosure</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground space-y-4 text-left leading-relaxed">
          <p>
            The content contained is for informational purposes only and should not be construed as specific investment,
            accounting, legal, or tax advice. Certain information is based on third party data which may become outdated
            or otherwise superseded without notice. Third party information is deemed to be reliable, but its accuracy
            and completeness cannot be guaranteed.
          </p>
          <p>
            By clicking on any of the links above, you acknowledge that they are solely for your convenience, and do not
            necessarily imply any affiliations, sponsorships, endorsements or representations whatsoever by us regarding
            third-party websites. We are not responsible for the content, availability or privacy policies of these sites,
            and shall not be responsible or liable for any information, opinions, advice, products or services available
            on or through them.
          </p>
          <p>
            The opinions expressed by featured authors are their own and may not accurately reflect those of the
            Main Line Briefing Room.
            Neither the Securities and Exchange Commission (SEC) nor any state or federal agency has approved, confirmed
            the accuracy, or determined the adequacy of this website.
          </p>
          <p className="font-semibold text-foreground">
            LSR-21-151
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleAcknowledge} className="w-full sm:w-auto">
            I Acknowledge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
