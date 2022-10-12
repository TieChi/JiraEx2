import { useMemo } from "react"
import { useLocation } from "react-router"
import { useKanbans } from "utils/kanban"
import { useProject } from "utils/project"
import { useTasks } from "utils/task"
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
  const projectId = useProjectIdInUrl()
  return useMemo(() => {
    return {
      projectId,
      name: params.name,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined
    }
  }, [params, projectId])
};

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]