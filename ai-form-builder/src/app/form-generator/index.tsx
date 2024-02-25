"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const FormGenerator = () => {
  const [open, setOpen] = useState(false);

  function onFormCreate() {
    setOpen(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button onClick={onFormCreate}>Create Form</button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Share what your form is about, who is it for and what information you would like to collect and AI will do the magic "
            ></Textarea>
          </div>
        </form>
        <DialogFooter>
          <Button variant="link">Create Manually</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;
