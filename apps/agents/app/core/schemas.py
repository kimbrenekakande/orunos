from typing import Optional
from pydantic import BaseModel


class leadReq(BaseModel):
    industry: str
    country: str
    exclude : list[str] = []


class SearchResult(BaseModel):
    id: Optional[int]
    name: Optional[str] = None
    url: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    profile: Optional[str] = None
    draft: Optional[str] = None


class leadsSearchState(BaseModel):
    industry: str
    country: str
    exclude: list[str] = []
    leads: list[SearchResult]


class emailReq(BaseModel):
    companies: list[SearchResult]


class CompanyReport(BaseModel):
    name: str
    email: str
    profile: str


class ProfileData(BaseModel):
    email: Optional[str]
    location: Optional[str]
