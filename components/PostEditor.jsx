"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostEditorHeader from "./post-editor-header";
import PostEditorContent from "./PostEditorContent";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).max(10, "maximum of 10 tags allowed"),
  featuredImage: z.string().optional(),
  scheduledFor: z.string().optional(),
});

const PostEditor = ({ initialData = null, mode = "create" }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalType, setImageModalType] = useState("featured");

  const router = useRouter();

  const { mutate: createPost, isLoading: isCreateLoading } = useConvexMutation(
    api.posts.create
  );

  const { mutate: updatePost, isLoading: isUpdating } = useConvexMutation(
    api.posts.update
  );

  useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      featuredImage: initialData?.featuredImage || "",
      scheduledFor: initialData?.scheduledFor
        ? new Date(initialData.scheduledFor).toISOString().slice(0, 16)
        : "",
    },
  });

  const handleSave = () => {}

  const handlePublishing = () => {}

  const handleSchedule = () => {}

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* header */}
      <PostEditorHeader
        mode={mode}
        initialData={initialData}
        isPublishing={isCreateLoading || isUpdating}
        onSave={handleSave}
        onPublish={handlePublishing}
        onSchedule={handleSchedule}
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onback={() => router.push("/dashboard")}
      />

      {/* editor */}
      <PostEditorContent/>

      {/* settings dialog */}

      {/* image upload dialog */}
    </div>
  );
};

export default PostEditor;
