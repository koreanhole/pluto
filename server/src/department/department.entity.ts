import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export enum DeptType {
  General = '일반공지',
  Bachelor = '학사공지',
  Recruit = '직원채용',
  Enterpreneur = '창업공지',
  Bidding = '입찰공고',
  Facility = '시설공사',
  Dormitory = '생활관',
  InterChange = '국제교육원',
  Engineering = '공과대학',
  Electronic = '전기전자컴퓨터공학부',
  Computer = '컴퓨터과학부',
  Chemical = '화학공학과',
  Machine = '기계정보공학과',
  NewMaterial = '신소재공학과',
  Civil = '토목공학과',
  Business = '경영학부',
  Politics = '정경대학',
  Adminstration = '행정학과',
  InternationalRelation = '국제관계학과',
  Economics = '경제학부',
  SocialWelfare = '사회복지학과',
  Taxation = '세무학과',
  Humanitics = '인문대학',
  English = '영어영문학과',
  Korean = '국어국문학과',
  History = '국사학과',
  Philosophy = '철학과',
  Chinese = '중국어문화학과',
  NaturalScience = '자연과학대학',
  Mathematics = '수학과',
  Statics = '통계학과',
  Physics = '물리학과',
  LifeScience = '생명과학과',
  EnvironmentalGardening = '환경원예학과',
}
registerEnumType(DeptType, { name: 'DeptType' });

export enum DeptClassification {
  General = '전체공지',
  Engineering = '공과대학',
  Economics = '정경대학',
  Humanitics = '인문대학',
  NaturalScience = '자연과학대학',
  Business = '경영대학',
  Others = '기타부서',
}
registerEnumType(DeptClassification, { name: 'DeptClassification' });

@Entity()
export class Department {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  deptName: string;

  @Column()
  deptCode: string;

  @Column()
  deptClassification: DeptClassification;

  @Column()
  deptType: DeptType;

  @Column()
  lastFetchedListId: string;
}
