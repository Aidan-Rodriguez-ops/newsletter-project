'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Article } from '@/lib/supabase'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'
import { formatDistance } from 'date-fns'

interface ArticlesTableProps {
  articles: Article[]
  onStatusChange: (id: string, status: 'draft' | 'published') => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function ArticlesTable({ articles, onStatusChange, onDelete }: ArticlesTableProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleStatusToggle = async (article: Article) => {
    setLoading(article.id)
    const newStatus = article.status === 'published' ? 'draft' : 'published'
    await onStatusChange(article.id, newStatus)
    setLoading(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    setLoading(id)
    await onDelete(id)
    setLoading(null)
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                No articles found
              </TableCell>
            </TableRow>
          ) : (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{article.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={article.status === 'published' ? 'default' : 'secondary'}
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {article.author}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDistance(new Date(article.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={loading === article.id}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/articles/${article.slug}`} target="_blank">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/articles/${article.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusToggle(article)}>
                        {article.status === 'published' ? (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(article.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
