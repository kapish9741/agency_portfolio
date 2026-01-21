"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

function Avatar({ className, ...props }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

/* 👇 NOT INSTALLED BY CLI — MANUAL */
function AvatarGroup({ className, children }) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-3", className)}
    >
      {children}
    </div>
  )
}

function AvatarGroupCount({ className, children }) {
  return (
    <span
      data-slot="avatar-group-count"
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
}
