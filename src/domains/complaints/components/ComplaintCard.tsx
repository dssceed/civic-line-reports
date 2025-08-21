
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import { Complaint } from "@/common/types";
import { ComplaintService } from "../services/complaint.service";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ComplaintCardProps {
  complaint: Complaint;
  onViewDetails: (complaint: Complaint) => void;
  onViewTimeLine: (complaint: Complaint) => void;
  onViewMap: (complaint: Complaint) => void;
}

export const ComplaintCard = ({ complaint, onViewDetails, onViewTimeLine, onViewMap }: ComplaintCardProps) => {
  return (
    <div className="border border-blue-500/30 rounded-lg p-4 bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-300 text-lg">{complaint.id}</span>
          <Badge variant="outline" className="bg-cyan-600/20 text-cyan-300 border-cyan-600/50">
            {complaint.category}
          </Badge>
          <Badge className={ComplaintService.getPriorityColor(complaint.priority)}>
            {complaint.priority}
          </Badge>
        </div>
        <Badge className={ComplaintService.getStatusColor(complaint.status)}>
          {complaint.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-sm text-blue-400/70 mb-1">ผู้แจ้ง:</p>
          <p className="font-medium text-blue-200 line-clamp-1">{complaint.reporterName}</p>
          <p className="text-sm text-blue-300/70 ">@{complaint.reporterLine}</p>
        </div>
        <div className="border-l-4 border-indigo-500 pl-2">
          <p className="text-sm text-blue-400/70 mb-1">สถานที่:</p>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-200">{complaint.location}</span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-blue-400/70 mb-1">รายละเอียด:</p>
        <p className="text-blue-200 line-clamp-1">{complaint.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-0 text-sm text-blue-400/70">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{complaint.dateReported}</span>
          </div>
          <div className="flex items-center gap-1">
            {complaint.assignedTo && (
              <span className="text-purple-300"><b className="font-bold">มอบหมายให้:</b> {complaint.assignedTo}</span>
            )}
          </div>
        </div>

        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(complaint)}
          className="bg-slate-700/50 border-blue-500/30 text-blue-100 hover:bg-slate-700/70"
        >
          <Eye className="mr-2 h-4 w-4" />
          ดูรายละเอียด
        </Button> */}

        <div className="bg-slate-800 p-2 rounded-lg inline-flex items-center space-x-0 border border-1 border-gray-700">
          <TooltipProvider>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg" onClick={() => onViewTimeLine(complaint)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Time line</p>
              </TooltipContent>
            </Tooltip>
            <div className="border-l border-slate-700 h-6 mx-2"></div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg" onClick={() => onViewMap(complaint)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ดูแผนที่</p>
              </TooltipContent>
            </Tooltip>
            <div className="border-l border-slate-700 h-6 mx-2"></div> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex gap-1 items-center p-2 text-slate-400 hover:bg-slate-700 rounded-lg" onClick={() => onViewDetails(complaint)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  ดูรายละเอียด
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ดูรายละเอียด</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
