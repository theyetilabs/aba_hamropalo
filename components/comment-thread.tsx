"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Reply, Flag } from "lucide-react"

interface Comment {
  id: string
  author: string
  avatar: string
  role: "member" | "expert" | "facilitator"
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies: Comment[]
  userLiked?: boolean
  userDisliked?: boolean
}

interface CommentThreadProps {
  comments: Comment[]
  locale: "en" | "ne"
  onAddComment?: (content: string, parentId?: string) => void
}

const content = {
  en: {
    reply: "Reply",
    like: "Like",
    dislike: "Dislike",
    report: "Report",
    writeComment: "Write a comment...",
    postComment: "Post Comment",
    cancel: "Cancel",
    expert: "Expert",
    facilitator: "Facilitator",
    member: "Member",
  },
  ne: {
    reply: "जवाफ दिनुहोस्",
    like: "मन पर्यो",
    dislike: "मन परेन",
    report: "रिपोर्ट गर्नुहोस्",
    writeComment: "टिप्पणी लेख्नुहोस्...",
    postComment: "टिप्पणी पोस्ट गर्नुहोस्",
    cancel: "रद्द गर्नुहोस्",
    expert: "विशेषज्ञ",
    facilitator: "सुविधाकर्ता",
    member: "सदस्य",
  },
}

function CommentItem({
  comment,
  locale,
  depth = 0,
}: {
  comment: Comment
  locale: "en" | "ne"
  depth?: number
}) {
  const t = content[locale]
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [liked, setLiked] = useState(comment.userLiked || false)
  const [disliked, setDisliked] = useState(comment.userDisliked || false)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "expert":
        return "bg-purple-100 text-purple-800"
      case "facilitator":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "expert":
        return t.expert
      case "facilitator":
        return t.facilitator
      default:
        return t.member
    }
  }

  return (
    <div className={`${depth > 0 ? "ml-8 mt-4" : ""}`}>
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback>{comment.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.author}</span>
                {comment.role !== "member" && (
                  <span className={`text-xs px-2 py-1 rounded ${getRoleColor(comment.role)}`}>
                    {getRoleLabel(comment.role)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">{comment.timestamp}</p>
              <p className="text-sm mb-4">{comment.content}</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition"
                >
                  <ThumbsUp className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`} />
                  <span>{comment.likes + (liked && !comment.userLiked ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => setDisliked(!disliked)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition"
                >
                  <ThumbsDown className={`h-4 w-4 ${disliked ? "fill-accent text-accent" : ""}`} />
                  <span>{comment.dislikes + (disliked && !comment.userDisliked ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition"
                >
                  <Reply className="h-4 w-4" />
                  <span>{t.reply}</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition">
                  <Flag className="h-4 w-4" />
                  <span>{t.report}</span>
                </button>
              </div>

              {isReplying && (
                <div className="mt-4 pt-4 border-t">
                  <Textarea
                    placeholder={t.writeComment}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={3}
                    className="mb-3"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      {t.postComment}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsReplying(false)}>
                      {t.cancel}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} locale={locale} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentThread({ comments, locale, onAddComment }: CommentThreadProps) {
  const t = content[locale]
  const [newComment, setNewComment] = useState("")

  const handlePostComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment)
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      {/* New Comment Form */}
      <Card>
        <CardContent className="pt-6">
          <Textarea
            placeholder={t.writeComment}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="mb-4"
          />
          <div className="flex gap-2">
            <Button onClick={handlePostComment} className="bg-primary hover:bg-primary/90">
              {t.postComment}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} locale={locale} />
        ))}
      </div>
    </div>
  )
}
