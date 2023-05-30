package pers.kiriraincat.strooptestbackend.store;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ResultMapper {
    @Insert("")
    int insert();
}
