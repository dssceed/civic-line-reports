
import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplaintDetailModal } from "@/domains/complaints/components/ComplaintDetailModal";
import {
  ComplaintFiltersComponent,
  ComplaintCard,
  useComplaintFilters,
  ComplaintService
} from "@/domains/complaints";
import { Complaint } from "@/common/types";
import Timeline from "@/components/ui/timeline";
import { ComplaintTimelineModal } from "@/domains/complaints/components/ComplaintTimelineModal";
import { ComplaintMapModal } from "@/domains/complaints/components/ComplaintMapModal";

const Complaints = () => {
  const { filters, updateSearchTerm, updateStatusFilter, updateCategoryFilter } = useComplaintFilters();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedComplaintTimeLine, setSelectedComplaintTimeLine] = useState<Complaint | null>(null);
  const [selectedComplaintMap, setSelectedComplaintMap] = useState<Complaint | null>(null);

  const complaints = ComplaintService.getComplaints();
  const filteredComplaints = ComplaintService.filterComplaints(complaints, filters);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">จัดการเรื่องร้องเรียน</h1>
          <p className="text-blue-300/80">รายการเรื่องร้องเรียนทั้งหมดและการจัดการ</p>
        </div>

        {/* Filters */}
        <ComplaintFiltersComponent
          filters={filters}
          onSearchChange={updateSearchTerm}
          onStatusChange={updateStatusFilter}
          onCategoryChange={updateCategoryFilter}
        />

        {/* Complaints List */}
        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100">
              รายการเรื่องร้องเรียน ({filteredComplaints.length} รายการ)
            </CardTitle>
            <CardDescription className="text-blue-300/80">
              รายการเรื่องร้องเรียนที่ตรงกับเงื่อนไขที่เลือก
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onViewDetails={setSelectedComplaint}
                  onViewTimeLine={setSelectedComplaintTimeLine}
                  onViewMap={setSelectedComplaintMap}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* <Timeline></Timeline> */}

        {/* Detail Modal */}
        <ComplaintDetailModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />

        <ComplaintTimelineModal
          complaint={selectedComplaintTimeLine}
          onClose={() => setSelectedComplaintTimeLine(null)}
        />

        <ComplaintMapModal
          complaint={selectedComplaintMap}
          onClose={() => setSelectedComplaintMap(null)}
        />
      </div>
    </AdminLayout>
  );
};

export default Complaints;
