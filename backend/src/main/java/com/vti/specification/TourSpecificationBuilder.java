package com.vti.specification;

import com.vti.dto.filter.GroupFilter;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Group;
import com.vti.entity.Tour;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class TourSpecificationBuilder {
    private TourFilter filter;
    private String searchThoiGian;
    private String searchNoiKhoiHanh;
    private String searchDiemDen;


    public TourSpecificationBuilder(TourFilter filter, String searchThoiGian, String searchNoiKhoiHanh, String searchDiemDen) {
        this.filter = filter;
        this.searchThoiGian = searchThoiGian;
        this.searchNoiKhoiHanh = searchNoiKhoiHanh;
        this.searchDiemDen = searchDiemDen;
    }

    @SuppressWarnings("deprecation")
    public Specification<Tour> build() {

        SearchCriteria seachCriteria = new SearchCriteria("thoiGian", "Like", searchThoiGian);
        SearchCriteria seachCriteria2 = new SearchCriteria("noiKhoiHanh", "Like", searchNoiKhoiHanh);
        SearchCriteria seachCriteria3 = new SearchCriteria("tenTour", "Like", searchDiemDen);

        Specification<Tour> where = null;

        if (!StringUtils.isEmpty(searchThoiGian)) {
            where = new TourSpecification(seachCriteria);
        }

        if (!StringUtils.isEmpty(searchNoiKhoiHanh)) {
            where = new TourSpecification(seachCriteria2);
        }

        if (!StringUtils.isEmpty(searchDiemDen)) {
            where = new TourSpecification(seachCriteria3);
        }



        return where;
    }
}
