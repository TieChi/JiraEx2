import { useCallback, useMemo } from "react"
import { useLocation } from "react-router"
import { useDebounce } from "utils"
import { useKanbans } from "utils/kanban"
import { useProject } from "utils/project"
import { useTask, useTasks } from "utils/task"
import { useUrlQueryParam } from "utils/url"

export const useProjectIdInUrl = () => {
  const {pathname} = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbansSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbansSearchParams()];

export const useTasksSearchParams = () => {
  const [params, setParams] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const debounceName = useDebounce(params.name, 200)
  const projectId = useProjectIdInUrl()
  return useMemo(() => {
    return {
      projectId,
      name: debounceName,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined
    }
  }, [params, projectId, debounceName])
};

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModal = () => {
  const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const {data: editingTask, isLoading} = useTask(Number(editingTaskId))
  const startEdit = useCallback((id: number) => {
    setEditingTaskId({editingTaskId: id})
  }, [setEditingTaskId])
  const close = useCallback(() => {
    setEditingTaskId({editingTaskId: ''})
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close
  }
}